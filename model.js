// Función para predecir el riesgo utilizando regresión lineal
function predecirStroke(age, hypertension, heart_disease, avg_glucose_level, bmi, gender, ever_married, work_type, Residence_type, smoking_status) {
  // Coeficientes de la regresión lineal (según el modelo entrenado)
  const intercepto = 0.045;
  const coefAge = 0.068;
  const coefHypertension = 0.010;
  const coefHeartDisease = 0.011;
  const coefAvgGlucoseLevel = 0.013;
  const coefBmi = -0.005;
  const coefGenderMale = -0.003;
  const coefGenderOther = 0.000;
  const coefEverMarriedYes = -0.018;
  const coefWorkTypeNeverWorked = 0.002;
  const coefWorkTypePrivate = 0.006;
  const coefWorkTypeSelfEmployed = -0.004;
  const coefWorkTypeChildren = 0.020;
  const coefResidenceTypeUrban = 0.003;
  const coefSmokingStatusFormerlySmoked = -0.003;
  const coefSmokingStatusNeverSmoked = -0.004;
  const coefSmokingStatusSmokes = 0.000;

  // Codificar variables categóricas
  const genderMale = (gender === 'Male') ? 1 : 0;
  const genderOther = (gender === 'Other') ? 1 : 0;
  const everMarriedYes = (ever_married === 'Yes') ? 1 : 0;
  const workTypeNeverWorked = (work_type === 'Never_worked') ? 1 : 0;
  const workTypePrivate = (work_type === 'Private') ? 1 : 0;
  const workTypeSelfEmployed = (work_type === 'Self-employed') ? 1 : 0;
  const workTypeChildren = (work_type === 'children') ? 1 : 0;
  const residenceTypeUrban = (Residence_type === 'Urban') ? 1 : 0;
  const smokingStatusFormerlySmoked = (smoking_status === 'formerly smoked') ? 1 : 0;
  const smokingStatusNeverSmoked = (smoking_status === 'never smoked') ? 1 : 0;
  const smokingStatusSmokes = (smoking_status === 'smokes') ? 1 : 0;

  // Calcular el valor de la regresión lineal (puntaje de riesgo)
  const puntajeRiesgo = intercepto 
      + coefAge * age 
      + coefHypertension * hypertension 
      + coefHeartDisease * heart_disease
      + coefAvgGlucoseLevel * avg_glucose_level
      + coefBmi * bmi
      + coefGenderMale * genderMale
      + coefGenderOther * genderOther
      + coefEverMarriedYes * everMarriedYes
      + coefWorkTypeNeverWorked * workTypeNeverWorked
      + coefWorkTypePrivate * workTypePrivate
      + coefWorkTypeSelfEmployed * workTypeSelfEmployed
      + coefWorkTypeChildren * workTypeChildren
      + coefResidenceTypeUrban * residenceTypeUrban
      + coefSmokingStatusFormerlySmoked * smokingStatusFormerlySmoked
      + coefSmokingStatusNeverSmoked * smokingStatusNeverSmoked
      + coefSmokingStatusSmokes * smokingStatusSmokes;

  return puntajeRiesgo;
}

// Llamar a la función cuando se envíe el formulario
document.getElementById("prediccionForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evitar que el formulario se envíe

  // Obtener los valores del formulario
  const age = parseInt(document.getElementById("age").value);
  const hypertension = parseInt(document.getElementById("hypertension").value);
  const heart_disease = parseInt(document.getElementById("heart_disease").value);
  const avg_glucose_level = parseFloat(document.getElementById("avg_glucose_level").value);
  const bmi = parseFloat(document.getElementById("bmi").value);
  const gender = document.getElementById("gender").value;
  const ever_married = document.getElementById("ever_married").value;
  const work_type = document.getElementById("work_type").value;
  const Residence_type = document.getElementById("Residence_type").value;
  const smoking_status = document.getElementById("smoking_status").value;

  // Validar que los valores no sean menores o iguales a 0
  if (age <= 0 || hypertension < 0 || heart_disease < 0 || avg_glucose_level <= 0 || bmi <= 0) {
      alert("Por favor, ingresa valores mayores que 0 para todas las entradas numéricas.");
      return; // Detener la ejecución si algún valor es inválido
  }

  // Realizar la predicción
  const puntaje = predecirStroke(age, hypertension, heart_disease, avg_glucose_level, bmi, gender, ever_married, work_type, Residence_type, smoking_status);

  // Mostrar el puntaje de riesgo
  const resultadoElemento = document.getElementById("resultado");
  const prediccionElemento = document.getElementById("prediccionResultado");
  prediccionElemento.textContent = "Puntaje de riesgo: " + puntaje.toFixed(2);

  // Mostrar el mensaje de interpretación
  const mensajeInterpretacion = document.getElementById("mensajeInterpretacion");
  const umbral = 4; // Ajusta este valor según lo que se vea en los datos de tu modelo

  if (puntaje > umbral) {
      mensajeInterpretacion.textContent = "El riesgo de sufrir un accidente cerebrovascular (stroke) es alto.";
      mensajeInterpretacion.className = "mensaje alto-riesgo";
  } else {
      mensajeInterpretacion.textContent = "El riesgo de sufrir un accidente cerebrovascular (stroke) es bajo.";
      mensajeInterpretacion.className = "mensaje bajo-riesgo";
  }

  resultadoElemento.style.display = "block";
});
