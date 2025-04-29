// Función para escalar las variables numéricas
function escalar(valor, media, desviacion) {
  return (valor - media) / desviacion;
}

// Función para predecir el riesgo utilizando regresión logística
function predecirStroke(age, hypertension, heart_disease, avg_glucose_level, bmi, gender, ever_married, work_type, Residence_type, smoking_status) {
  // Medias y desviaciones estándar obtenidas de Python
  const mediaEdad = 43.2;
  const stdEdad = 22.5;
  const mediaGlucosa = 106.1;
  const stdGlucosa = 45.2;
  const mediaBMI = 28.4;
  const stdBMI = 7.8;

  // Escalar las variables numéricas
  const edadEscalada = escalar(age, mediaEdad, stdEdad);
  const glucosaEscalada = escalar(avg_glucose_level, mediaGlucosa, stdGlucosa);
  const bmiEscalado = escalar(bmi, mediaBMI, stdBMI);

  // Coeficientes del modelo entrenado (debes usar los que salieron tras el escalado)
  const intercepto = -0.195;
  const coefAge = 1.577;
  const coefHypertension = -0.040;
  const coefHeartDisease = 0.074;
  const coefAvgGlucoseLevel = 0.105;
  const coefBmi = -0.172;
  const coefGenderMale = 0.170;
  const coefEverMarriedYes = -0.023;
  const coefWorkNeverWorked = -0.109;
  const coefWorkPrivate = 0.168;
  const coefWorkSelfEmployed = 0.031;
  const coefWorkChildren = 0.083;
  const coefResidenceUrban = 0.049;
  const coefSmokeFormer = 0.103;
  const coefSmokeNever = 0.019;
  const coefSmokeSmokes = 0.043;

  // Codificar variables categóricas
  const genderMale = (gender === 'Male') ? 1 : 0;
  const everMarriedYes = (ever_married === 'Yes') ? 1 : 0;
  const workNeverWorked = (work_type === 'Never_worked') ? 1 : 0;
  const workPrivate = (work_type === 'Private') ? 1 : 0;
  const workSelfEmployed = (work_type === 'Self-employed') ? 1 : 0;
  const workChildren = (work_type === 'children') ? 1 : 0;
  const residenceUrban = (Residence_type === 'Urban') ? 1 : 0;
  const smokeFormer = (smoking_status === 'formerly smoked') ? 1 : 0;
  const smokeNever = (smoking_status === 'never smoked') ? 1 : 0;
  const smokeSmokes = (smoking_status === 'smokes') ? 1 : 0;

  // Calcular el logit
  const logit = intercepto
    + coefAge * edadEscalada
    + coefHypertension * hypertension
    + coefHeartDisease * heart_disease
    + coefAvgGlucoseLevel * glucosaEscalada
    + coefBmi * bmiEscalado
    + coefGenderMale * genderMale
    + coefEverMarriedYes * everMarriedYes
    + coefWorkNeverWorked * workNeverWorked
    + coefWorkPrivate * workPrivate
    + coefWorkSelfEmployed * workSelfEmployed
    + coefWorkChildren * workChildren
    + coefResidenceUrban * residenceUrban
    + coefSmokeFormer * smokeFormer
    + coefSmokeNever * smokeNever
    + coefSmokeSmokes * smokeSmokes;

  // Función sigmoide para obtener probabilidad
  const probabilidad = 1 / (1 + Math.exp(-logit));
  return probabilidad;
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
    return;
  }

  // Realizar la predicción
  const probabilidad = predecirStroke(age, hypertension, heart_disease, avg_glucose_level, bmi, gender, ever_married, work_type, Residence_type, smoking_status);
  console.log(age, hypertension, heart_disease, avg_glucose_level, bmi, gender, ever_married, work_type, Residence_type, smoking_status);
  // Mostrar el resultado
  const resultadoElemento = document.getElementById("resultado");
  const prediccionElemento = document.getElementById("prediccionResultado");
  document.getElementById("resultado").classList.add("mostrar");
document.getElementById("resultado").style.display = "block"; 
  prediccionElemento.textContent = "Probabilidad de riesgo: " + (probabilidad * 100).toFixed(2) + "%";

  // Mostrar el mensaje de interpretación
  const mensajeInterpretacion = document.getElementById("mensajeInterpretacion");
  const umbral = 0.5; // 50% de probabilidad

  if (probabilidad > umbral) {
    mensajeInterpretacion.textContent = "El riesgo de sufrir un accidente cerebrovascular (stroke) es ALTO.";
    mensajeInterpretacion.className = "mensaje alto-riesgo";
  } else {
    mensajeInterpretacion.textContent = "El riesgo de sufrir un accidente cerebrovascular (stroke) es BAJO.";
    mensajeInterpretacion.className = "mensaje bajo-riesgo";
  }

  resultadoElemento.style.display = "block";
});
