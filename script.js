document.getElementById('boletaForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const sueldo = parseFloat(document.getElementById('sueldo').value);
  const tieneAF = document.getElementById('asignacionFamiliar').value === 'si';
  const regimen = document.getElementById('regimen').value;

  const sctrSaludInput = document.getElementById('sctrSalud').value;
  const sctrPensionInput = document.getElementById('sctrPension').value;
  const vidaLeyInput = document.getElementById('vidaLey').value;

  if (
    isNaN(sueldo) || sueldo <= 0 ||
    sctrSaludInput.trim() === "" || isNaN(parseFloat(sctrSaludInput)) ||
    sctrPensionInput.trim() === "" || isNaN(parseFloat(sctrPensionInput)) ||
    vidaLeyInput.trim() === "" || isNaN(parseFloat(vidaLeyInput))
  ) {
    alert("Por favor, ingresa todos los datos correctamente antes de calcular.");
    return;
  }

  const af = tieneAF ? 102 : 0;
  const ingresos = sueldo + af;

  const essalud = 0.09;
  const onp = 0.13;
  const afpObligatoria = 0.10;
  const afpPrima = 0.0137;

  const sctrSalud = parseFloat(sctrSaludInput) / 100;
  const sctrPension = parseFloat(sctrPensionInput) / 100;
  const vidaLey = parseFloat(vidaLeyInput) / 100;

  let descuento = 0;
  let detalleDescuento = "";

  if (regimen === 'onp') {
    descuento = ingresos * onp;
    detalleDescuento = `Descuento ONP (13%): S/ ${descuento.toFixed(2)}`;
  } else {
    const aporteObligatorio = ingresos * afpObligatoria;
    const primaSeguro = ingresos * afpPrima;
    descuento = aporteObligatorio + primaSeguro;
    detalleDescuento = `
      SPP/AFP Aporte Obligatorio (10.00%): S/ ${aporteObligatorio.toFixed(2)}<br>
      SPP/AFP Prima de Seguro (1.37%): S/ ${primaSeguro.toFixed(2)}<br>
      <strong>Total AFP: S/ ${descuento.toFixed(2)}</strong>
    `;
  }

  const sueldoNeto = ingresos - descuento;

  const aporteEssalud = ingresos * essalud;
  const aporteSctrSalud = ingresos * sctrSalud;
  const aporteSctrPension = ingresos * sctrPension;
  const aporteVidaLey = ingresos * vidaLey;

  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.style.display = 'block';
  resultadoDiv.innerHTML = `
    <h3>Resultado</h3>
    <p><strong>Sueldo Básico:</strong> S/ ${sueldo.toFixed(2)}</p>
    <p><strong>Asignación Familiar:</strong> S/ ${af.toFixed(2)}</p>
    <p><strong>Ingresos Totales:</strong> S/ ${ingresos.toFixed(2)}</p>
    <hr>
    <p><strong>Descuentos:</strong><br>${detalleDescuento}</p>
    <hr>
    <p><strong>Aportes del Empleador:</strong></p>
    <ul>
      <li>EsSalud (9%): S/ ${aporteEssalud.toFixed(2)}</li>
      <li>SCTR Salud (${(sctrSalud * 100).toFixed(3)}%): S/ ${aporteSctrSalud.toFixed(2)}</li>
      <li>SCTR Pensión (${(sctrPension * 100).toFixed(3)}%): S/ ${aporteSctrPension.toFixed(2)}</li>
      <li>Seguro Vida Ley (${(vidaLey * 100).toFixed(3)}%): S/ ${aporteVidaLey.toFixed(2)}</li>
    </ul>
    <hr>
    <p><strong style="color:green">Sueldo Neto: S/ ${sueldoNeto.toFixed(2)}</strong></p>
  `;
});

document.getElementById('reiniciar').addEventListener('click', () => {
  document.getElementById('boletaForm').reset();
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = '';
  resultadoDiv.style.display = 'none';
});
