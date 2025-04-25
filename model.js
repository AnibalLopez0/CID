function guardar() {
    const inputs = document.querySelectorAll('input'); 
    let todosLlenos = true; // Variable para verificar si todos los inputs están completos
    let mensajeError = '';  // Mensaje de error
  
    // Recorre todos los inputs para verificar si están completos
    inputs.forEach(input => {
      if (input.value.trim() === '') { 
        todosLlenos = false;
        mensajeError += `El campo "${input.placeholder}" está vacío.\n`; 
      }
    });
  
    // Si todos los inputs están completos
    if (todosLlenos) {
      const prueba = document.getElementById('prueba').value;
      document.getElementById('texto').textContent = `PTM ${prueba}`; 
    } else {
      alert(mensajeError); // Muestra el mensaje de error
    }
  }

  let tries =0;
  
  // Detectar cuando el usuario presiona Enter en cualquier input
  document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input'); 
    
    inputs.forEach(input => {
      input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
          guardar(); // Llama a la función guardar cuando presiona Enter
        }
      });
    });
  
    // Mostrar imagen al pasar el mouse por la esquina
    const esquina = document.getElementById('esquina');
    const sorpresa = document.getElementById('sorpresa-container');
    
    esquina.addEventListener('mouseenter', () => {
      // Mostrar la imagen
     tries++;
     console.log(tries);
     if (tries===10)
     {
        sorpresa.style.display = 'flex';
  
        // Ocultarla luego de 3 segundos
        setTimeout(() => {
          sorpresa.style.display = 'none';
        }, 3000);

        tries=0;
     }
    });
  });
  