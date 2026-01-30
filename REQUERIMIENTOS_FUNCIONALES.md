# REQUERIMIENTOS FUNCIONALES - GYMAI COACH

Este documento contiene el desglose detallado de las Historias de Usuario y Criterios de Aceptación para el proyecto GymAI Coach.

---

### **HU-01: Interacción con el Coach Virtual IA**
| ID | Historia de Usuario | Como | Quiero | Para | Criterio de Aceptación |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **HU-01** | Interacción con Coach Virtual IA | Usuario de GymAI Coach | Interactuar con un chat inteligente | Recibir asesoría física personalizada | El sistema debe permitir enviar mensajes de texto al Coach y recibir respuestas basadas en IA en menos de 3 segundos. |
| **HU-01** | Interacción con Coach Virtual IA | Usuario de GymAI Coach | Interactuar con un chat inteligente | Recibir asesoría física personalizada | El usuario debe poder solicitar una rutina de entrenamiento y la IA debe generarla con ejercicios, series y repeticiones. |
| **HU-01** | Interacción con Coach Virtual IA | Usuario de GymAI Coach | Interactuar con un chat inteligente | Recibir asesoría física personalizada | La aplicación debe mantener el historial de la conversación durante la sesión actual del usuario. |
| **HU-01** | Interacción con Coach Virtual IA | Usuario de GymAI Coach | Interactuar con un chat inteligente | Recibir asesoría física personalizada | El sistema debe mostrar un indicador de carga ("escribiendo...") mientras la IA procesa la respuesta. |
| **HU-01** | Interacción con Coach Virtual IA | Usuario de GymAI Coach | Interactuar con un chat inteligente | Recibir asesoría física personalizada | Las respuestas de la IA deben ser coherentes con los datos del perfil (nivel y objetivo) del usuario. |

---

### **HU-02: Registro de Sesión de Entrenamiento**
| ID | Historia de Usuario | Como | Quiero | Para | Criterio de Aceptación |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **HU-02** | Ejecución de Sesión en Tiempo Real | Usuario en el gimnasio | Registrar mi actividad por cada serie | Llevar un control de mi carga y esfuerzo | El sistema debe permitir ingresar el peso (kg) y las repeticiones para cada serie de cada ejercicio. |
| **HU-02** | Ejecución de Sesión en Tiempo Real | Usuario en el gimnasio | Registrar mi actividad por cada serie | Llevar un control de mi carga y esfuerzo | El usuario debe poder marcar cada serie como "completada" mediante un botón de check visual. |
| **HU-02** | Ejecución de Sesión en Tiempo Real | Usuario en el gimnasio | Registrar mi actividad por cada serie | Llevar un control de mi carga y esfuerzo | La aplicación debe incluir un selector de RPE (esfuerzo percibido) del 1 al 10 para cada ejercicio. |
| **HU-02** | Ejecución de Sesión en Tiempo Real | Usuario en el gimnasio | Registrar mi actividad por cada serie | Llevar un control de mi carga y esfuerzo | El sistema debe contabilizar el tiempo transcurrido desde que se inició la sesión de entrenamiento. |
| **HU-02** | Ejecución de Sesión en Tiempo Real | Usuario en el gimnasio | Registrar mi actividad por cada serie | Llevar un control de mi carga y esfuerzo | Al finalizar, debe aparecer un mensaje de confirmación y el botón para guardar los datos en la base de datos. |

---

### **HU-03: Biblioteca de Tutoriales**
| ID | Historia de Usuario | Como | Quiero | Para | Criterio de Aceptación |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **HU-03** | Consulta de Biblioteca de Ejercicios | Usuario principiante | Ver la lista de ejercicios y tutoriales | Ejecutar correctamente los movimientos técnicos | El sistema debe mostrar una lista completa de ejercicios con una imagen descriptiva o ícono para cada uno. |
| **HU-03** | Consulta de Biblioteca de Ejercicios | Usuario principiante | Ver la lista de ejercicios y tutoriales | Ejecutar correctamente los movimientos técnicos | El usuario debe poder filtrar los ejercicios por grupo muscular (Pecho, Espalda, Piernas, etc.). |
| **HU-03** | Consulta de Biblioteca de Ejercicios | Usuario principiante | Ver la lista de ejercicios y tutoriales | Ejecutar correctamente los movimientos técnicos | Al seleccionar un ejercicio, el sistema debe abrir un modal con un video tutorial integrado de YouTube. |
| **HU-03** | Consulta de Biblioteca de Ejercicios | Usuario principiante | Ver la lista de ejercicios y tutoriales | Ejecutar correctamente los movimientos técnicos | El modal debe permitir ver el video sin necesidad de salir de la aplicación principal. |
| **HU-03** | Consulta de Biblioteca de Ejercicios | Usuario principiante | Ver la lista de ejercicios y tutoriales | Ejecutar correctamente los movimientos técnicos | Debe existir un buscador de texto para localizar ejercicios específicos por su nombre rápidamente. |

---

### **HU-04: Gestión de Biometría**
| ID | Historia de Usuario | Como | Quiero | Para | Criterio de Aceptación |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **HU-04** | Registro de Perfil Físico | Usuario registrado | Actualizar mis datos biométricos | Que el sistema se adapte a mi estado actual | El sistema debe permitir ingresar y guardar valores numéricos de peso (kg) y altura (cm). |
| **HU-04** | Registro de Perfil Físico | Usuario registrado | Actualizar mis datos biométricos | Que el sistema se adapte a mi estado actual | El usuario debe poder seleccionar su nivel de fitness (Principiante, Intermedio, Avanzado) desde una lista. |
| **HU-04** | Registro de Perfil Físico | Usuario registrado | Actualizar mis datos biométricos | Que el sistema se adapte a mi estado actual | La aplicación debe calcular y mostrar el IMC (Índice de Masa Corporal) automáticamente al guardar los datos. |
| **HU-04** | Registro de Perfil Físico | Usuario registrado | Actualizar mis datos biométricos | Que el sistema se adapte a mi estado actual | El sistema debe mostrar un mensaje "Perfil actualizado con éxito" tras una grabación correcta. |
| **HU-04** | Registro de Perfil Físico | Usuario registrado | Actualizar mis datos biométricos | Que el sistema se adapte a mi estado actual | Los datos guardados deben ser los que use la IA para personalizar las próximas recomendaciones. |

---

### **HU-05: Registro Visual (Selfies)**
| ID | Historia de Usuario | Como | Quiero | Para | Criterio de Aceptación |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **HU-05** | Seguimiento de Progreso Visual | Usuario motivado | Subir fotos de mi evolución física | Comparar mis cambios corporales en el tiempo | El sistema debe permitir seleccionar un archivo de imagen desde el dispositivo o capturarlo con la cámara. |
| **HU-05** | Seguimiento de Progreso Visual | Usuario motivado | Subir fotos de mi evolución física | Comparar mis cambios corporales en el tiempo | El usuario debe poder añadir una descripción o comentario a cada fotografía antes de subirla. |
| **HU-05** | Seguimiento de Progreso Visual | Usuario motivado | Subir fotos de mi evolución física | Comparar mis cambios corporales en el tiempo | Las imágenes deben almacenarse de forma segura y asociarse únicamente al ID del usuario activo. |
| **HU-05** | Seguimiento de Progreso Visual | Usuario motivado | Subir fotos de mi evolución física | Comparar mis cambios corporales en el tiempo | El sistema debe mostrar una galería de fotos ordenadas por fecha (de la más reciente a la más antigua). |
| **HU-05** | Seguimiento de Progreso Visual | Usuario motivado | Subir fotos de mi evolución física | Comparar mis cambios corporales en el tiempo | Debe existir la opción de eliminar una fotografía si el usuario ya no desea mantenerla en el registro. |

---

### **HU-06: Dashboard Analítico**
| ID | Historia de Usuario | Como | Quiero | Para | Criterio de Aceptación |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **HU-06** | Visualización de Estadísticas | Usuario analítico | Ver gráficos de mi constancia | Analizar mi disciplina semanal | La aplicación debe mostrar un gráfico dinámico que represente el "Puntaje de Constancia" de los últimos 7 días. |
| **HU-06** | Visualización de Estadísticas | Usuario analítico | Ver gráficos de mi constancia | Analizar mi disciplina semanal | El sistema debe contabilizar automáticamente cuántas sesiones se han realizado en la semana actual. |
| **HU-06** | Visualización de Estadísticas | Usuario analítico | Ver gráficos de mi constancia | Analizar mi disciplina semanal | El gráfico debe actualizarse en tiempo real cada vez que se guarde una nueva sesión de entrenamiento. |
| **HU-06** | Visualización de Estadísticas | Usuario analítico | Ver gráficos de mi constancia | Analizar mi disciplina semanal | La interfaz debe utilizar colores visuales (verde/rojo) para indicar si se ha cumplido el objetivo de entrenamiento. |
| **HU-06** | Visualización de Estadísticas | Usuario analítico | Ver gráficos de mi constancia | Analizar mi disciplina semanal | El dashboard debe estar adaptado para que los gráficos se vean correctamente tanto en móviles como en computadores. |
