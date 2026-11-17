using Microsoft.AspNetCore.Mvc;
using MinhaBiblioteca.Models;
namespace MinhaBiblioteca.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MateriaisController : ControllerBase
{
    private readonly IMaterialRepository _repository;

    public MateriaisController(IMaterialRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public IActionResult Get()
    {
        IEnumerable<object> resultado = _repository.ObterTodos().Select(material =>
        {
            if (material is Livro livro)
            {
                return (object)new
                {
                    livro.Id,
                    Tipo = "Livro",
                    livro.Titulo,
                    livro.AnoPublicacao,
                    livro.Autor,
                    livro.Paginas,
                    PrazoEmprestimo = livro.CalcularPrazo(),
                    Descricao = livro.Descricao()
                };
            }
            if (material is Revista revista)
            {
                return (object)new
                {
                    revista.Id,
                    Tipo = "Revista",
                    revista.Titulo,
                    revista.AnoPublicacao,
                    revista.Edicao,
                    revista.MesPublicacao,
                    PrazoEmprestimo = revista.CalcularPrazo(),
                    Descricao = revista.Descricao()
                };
            }
            return (object)material;
        });

        return Ok(resultado);
    }

    [HttpGet("{id:int}")]
    public IActionResult GetPorId(int id)
    {
        var material = _repository.ObterPorId(id);

        if (material == null)
        {
            return NotFound(new { mensagem = $"Material com ID {id} não encontrado." });
        }

        if (material is Livro livro)
        {
            return Ok(new
            {
                Tipo = "Livro",
                livro.Id,
                livro.Titulo,
                livro.Autor,
                livro.AnoPublicacao,
                livro.Paginas,
                PrazoEmprestimo = livro.CalcularPrazo(),
                Descricao = livro.Descricao()
            });
        }

        if (material is Revista revista)
        {
            return Ok(new
            {
                Tipo = "Revista",
                revista.Id,
                revista.Titulo,
                revista.AnoPublicacao,
                revista.Edicao,
                revista.MesPublicacao,
                PrazoEmprestimo = revista.CalcularPrazo(),
                Descricao = revista.Descricao()
            });
        }

        return Ok(material);
    }

    [HttpPost("livro")]
    public IActionResult PostLivro([FromBody] Livro livro)
    {
        string? erro = ValidarDadosComuns(livro);
        if (erro != null)
        {
            return BadRequest(new { mensagem = erro });
        }

        if (string.IsNullOrWhiteSpace(livro.Autor))
        {
            return BadRequest(new { mensagem = "O autor do livro é obrigatório." });
        }

        if (livro.Paginas <= 0)
        {
            return BadRequest(new { mensagem = "O número de páginas deve ser maior que zero." });
        }

        var criado = _repository.Adicionar(livro);
        return CreatedAtAction(nameof(GetPorId), new { id = criado.Id }, criado);
    }

    [HttpPost("revista")]
    public IActionResult PostRevista([FromBody] Revista revista)
    {
        string? erro = ValidarDadosComuns(revista);
        if (erro != null)
        {
            return BadRequest(new { mensagem = erro });
        }

        if (revista.Edicao <= 0)
        {
            return BadRequest(new { mensagem = "O número da edição deve ser maior que zero." });
        }

        if (revista.MesPublicacao < 1 || revista.MesPublicacao > 12)
        {
            return BadRequest(new { mensagem = "O mês de publicação deve estar entre 1 e 12." });
        }

        var criado = _repository.Adicionar(revista);
        return CreatedAtAction(nameof(GetPorId), new { id = criado.Id }, criado);
    }

    [HttpPut("livro/{id:int}")]
    public IActionResult PutLivro(int id, [FromBody] Livro livro)
    {
        var existente = _repository.ObterPorId(id);
        if (existente == null)
        {
            return NotFound(new { mensagem = $"Livro com ID {id} não encontrado." });
        }

        if (existente is not Livro)
        {
            return BadRequest(new { mensagem = "O material informado não é um livro." });
        }

        string? erro = ValidarDadosComuns(livro);
        if (erro != null)
        {
            return BadRequest(new { mensagem = erro });
        }

        if (string.IsNullOrWhiteSpace(livro.Autor))
        {
            return BadRequest(new { mensagem = "O autor do livro é obrigatório." });
        }

        if (livro.Paginas <= 0)
        {
            return BadRequest(new { mensagem = "O número de páginas deve ser maior que zero." });
        }

        bool atualizou = _repository.Atualizar(id, livro);
        if (!atualizou)
        {
            return NotFound(new { mensagem = $"Livro com ID {id} não encontrado." });
        }

        return Ok(livro);
    }

    [HttpPut("revista/{id:int}")]
    public IActionResult PutRevista(int id, [FromBody] Revista revista)
    {
        var existente = _repository.ObterPorId(id);
        if (existente == null)
        {
            return NotFound(new { mensagem = $"Revista com ID {id} não encontrada." });
        }

        if (existente is not Revista)
        {
            return BadRequest(new { mensagem = "O material informado não é uma revista." });
        }

        string? erro = ValidarDadosComuns(revista);
        if (erro != null)
        {
            return BadRequest(new { mensagem = erro });
        }

        if (revista.Edicao <= 0)
        {
            return BadRequest(new { mensagem = "O número da edição deve ser maior que zero." });
        }

        if (revista.MesPublicacao < 1 || revista.MesPublicacao > 12)
        {
            return BadRequest(new { mensagem = "O mês de publicação deve estar entre 1 e 12." });
        }

        bool atualizou = _repository.Atualizar(id, revista);
        if (!atualizou)
        {
            return NotFound(new { mensagem = $"Revista com ID {id} não encontrada." });
        }

        return Ok(revista);
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        bool removido = _repository.Remover(id);

        if (!removido)
        {
            return NotFound(new { mensagem = $"Material com ID {id} não encontrado." });
        }

        return NoContent();
    }

    [HttpGet("{id:int}/descricao")]
    public IActionResult GetDescricao(int id)
    {
        var material = _repository.ObterPorId(id);

        if (material == null)
        {
            return NotFound(new { mensagem = $"Material com ID {id} não encontrado." });
        }

        return Ok(new
        {
            Id = material.Id,
            Tipo = ObterTipo(material),
            Descricao = material.Descricao(),
            PrazoEmprestimo = material.CalcularPrazo()
        });
    }

    [HttpPost("{id:int}/emprestar")]
    public IActionResult Emprestar(int id)
    {
        var material = _repository.ObterPorId(id);

        if (material == null)
        {
            return NotFound(new { mensagem = $"Material com ID {id} não encontrado." });
        }

        if (material is not IEmprestimo emprestimo)
        {
            return BadRequest(new { mensagem = "Este tipo de material não permite empréstimo." });
        }

        return Ok(new { mensagem = emprestimo.Emprestar() });
    }

    private static string? ValidarDadosComuns(MaterialBiblioteca material)
    {
        if (string.IsNullOrWhiteSpace(material.Titulo))
        {
            return "O título do material é obrigatório.";
        }

        if (material.AnoPublicacao < 0)
        {
            return "O ano de publicação não pode ser menor que zero.";
        }

        return null;
    }

    private static string ObterTipo(MaterialBiblioteca material)
    {
        return material switch
        {
            Livro => "Livro",
            Revista => "Revista",
            _ => "Material"
        };
    }
}
