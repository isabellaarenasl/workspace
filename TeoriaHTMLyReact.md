1. HTML
Con tus propias palabras explicar
-Cuales son las etiquetas de estructura de un HTML
-Cuales son las etiquetas para agregar código
-Explicar 5 etiquetas de texto
2.JAVASCRIPT
-Explicar como funcionan las variables, tipos de variables, constantes y globales
-Explicar las estructuras de flujo
3.CSS
-Consultar selectores CSS y como modifican elementos
4.REACT
-Hacer una analogía explicativa de un componente de react de como se comporta como una etiqueta HTML
-Consultar como funcionan los props en los componentes de react
--------------------------------------------------------------------------------------------------------------------------------------------
-Como y cuando se usa UseEffect en un componente de React
-Como se usa UseSTaTe para las variables de un componenete
1. HTML

¿Cuáles son las etiquetas de estructura de un HTML?

Son las etiquetas que arman el "esqueleto" de toda página web, sin ellas el navegador no sabría ni siquiera que está leyendo un documento HTML. El <!DOCTYPE html> le dice al navegador que ese documento es HTML5 y va siempre de primero. La etiqueta <html> envuelve todo el contenido de la página. Dentro de ella va el <head>, que es la parte "invisible" para el usuario, ahí van cosas como el título de la pestaña, los enlaces a CSS y los metadatos; no se ve en pantalla, pero es información importante para el navegador, y dentro de él va el <title>, que define el texto que aparece en la pestaña. Luego va el <body>, que es donde está todo lo que sí se ve: textos, imágenes, botones, en fin, todo el contenido visual de la página. Dentro del body también se usan etiquetas como <header>, <main>, <footer> y <section> para organizar el contenido en bloques con un propósito claro, como encabezado, contenido principal o pie de página. En resumen, html es la casa completa, head son los planos que no se ven, y body es lo que uno realmente habita y ve.

¿Cuáles son las etiquetas para agregar código?

Cuando uno quiere meter código dentro del HTML, o mostrar código como texto, existen varias etiquetas pensadas para eso. La etiqueta script se usa para escribir o enlazar código JavaScript, puede ir directamente dentro del HTML o apuntar a un archivo externo. La etiqueta style sirve para escribir CSS directamente dentro del documento, sin necesidad de un archivo aparte. La etiqueta link se usa para conectar un archivo CSS externo, y es la forma más ordenada de trabajar con CSS en un proyecto grande. Por otro lado, cuando lo que se quiere es mostrar un fragmento de código como texto visible en la página, se usa la etiqueta code, y si además se quiere conservar el formato exacto del texto, con sus espacios y saltos de línea, se usa junto con la etiqueta pre.

Explicación de 5 etiquetas de texto

Las etiquetas h1 hasta h6 son los títulos y subtítulos de una página, siendo h1 el más importante y h6 el menos importante; ayudan a organizar la jerarquía del contenido, tal como los títulos y subtítulos de un documento de Word. La etiqueta p representa un párrafo de texto normal, y es la más común para escribir contenido corrido. La etiqueta strong resalta un texto dándole importancia, y por defecto se muestra en negrita, no solo visualmente sino también de forma semántica, indicándole al navegador que ese texto es relevante. La etiqueta em le da énfasis a un texto y por defecto se muestra en cursiva, se usa cuando se quiere que se note un cambio de tono en una palabra o frase. Por último, la etiqueta span es una etiqueta neutra que no representa nada por sí sola, se usa para encerrar un pedacito de texto dentro de un párrafo u otro elemento, normalmente para aplicarle un estilo específico sin romper el flujo del texto.

2. JavaScript

¿Cómo funcionan las variables? Tipos de variables, constantes y globales

Una variable es como una caja donde uno guarda un dato, ya sea un número, un texto o un valor verdadero o falso, para poder usarlo más adelante en el código. En JavaScript existen tres formas de crear esa caja. La palabra var es la forma antigua de declarar variables, su alcance abarca toda la función donde se creó y se puede volver a declarar sin problema, aunque hoy en día casi no se usa porque genera confusiones. La palabra let es la forma moderna de declarar una variable que sí puede cambiar de valor más adelante, y su alcance está limitado al bloque donde se creó, por ejemplo dentro de un if o un for, lo cual la hace más segura y predecible que var. La palabra const se usa para declarar una constante, es decir, un valor que no va a cambiar durante la ejecución del programa, por ejemplo el nombre de un usuario que no cambiará; vale aclarar que si esa constante guarda un objeto o un arreglo, el contenido de adentro sí se puede modificar, lo que no se puede es reasignar la variable completa a otro valor distinto. Además, una variable es global cuando se declara fuera de cualquier función, lo que significa que puede ser usada en cualquier parte del código, mientras que una variable es local cuando se declara dentro de una función o un bloque y solo existe ahí adentro; es buena práctica usar variables locales siempre que se pueda, porque las globales pueden generar errores difíciles de rastrear si varias partes del código las modifican al mismo tiempo.

Estructuras de flujo

Las estructuras de flujo son las que le dan lógica al programa, ya que permiten que el código tome decisiones o repita acciones. La estructura if junto con else ejecuta un bloque de código solo si se cumple una condición, y si no se cumple, ejecuta otro bloque distinto, es como decir que si pasa algo se haga una cosa y si no se haga otra. La estructura switch se usa cuando hay muchas condiciones posibles sobre una misma variable, y es una alternativa más ordenada a tener muchos if y else seguidos. El bucle for repite una acción un número determinado de veces, y es muy útil cuando ya se sabe de antemano cuántas veces se debe repetir algo, como recorrer una lista. El bucle while repite una acción mientras se cumpla una condición, sin saber de antemano cuántas veces se va a repetir, y se detiene apenas la condición deja de cumplirse. Por último, el bucle do while es parecido al while, pero garantiza que el código se ejecute al menos una vez, porque la condición se revisa al final y no al principio.

3. CSS

Selectores CSS y cómo modifican elementos

Los selectores son la forma en la que CSS elige a qué elementos del HTML les va a aplicar un estilo. El selector de etiqueta aplica el estilo a todas las etiquetas de ese tipo en la página, por ejemplo poniendo en azul todos los párrafos de una sola vez. El selector de clase aplica el estilo a todos los elementos que tengan esa clase asignada en su HTML, y es el más usado porque una misma clase se puede reutilizar en varios elementos distintos. El selector de id aplica el estilo únicamente al elemento que tenga ese identificador específico, ya que un id debe ser único en toda la página, por lo que se usa cuando se quiere apuntar a un solo elemento en particular. El selector universal aplica un estilo a absolutamente todos los elementos de la página, y se suele usar para resetear márgenes o espacios internos al inicio de un proyecto. El selector descendiente aplica el estilo solo a los elementos que están dentro de otro elemento específico, por ejemplo solo a los párrafos que están dentro de un div en particular. Finalmente, las pseudo clases aplican un estilo cuando el elemento está en un estado especial, por ejemplo cuando el mouse pasa por encima de un enlace. En pocas palabras, el selector es el a quién y las propiedades como el color, el tamaño de letra o los márgenes son el qué se le va a cambiar.

4. React

Analogía: un componente de React como si fuera una etiqueta HTML

El HTML normal solo ofrece etiquetas ya hechas de fábrica, como un párrafo o un botón, que uno no puede personalizar mucho más allá de ponerles estilos. Un componente de React es básicamente que uno se crea su propia etiqueta personalizada, con su propio comportamiento y apariencia por dentro. Por ejemplo, si uno crea un componente llamado tarjeta de usuario, después en el código se puede usar exactamente como si fuera una etiqueta HTML normal. Por dentro, esa etiqueta ya trae armado un pedazo entero de contenido, con su lógica y sus estilos, lista para reutilizarse las veces que uno quiera, como si fuera una plantilla que se arma una sola vez y luego se estampa donde se necesite.

¿Cómo funcionan los props en los componentes de React?

Los props, que vienen de la palabra en inglés properties, son la forma en la que un componente recibe información desde afuera, algo parecido a los atributos que uno le pone a una etiqueta HTML normal. Siguiendo el ejemplo de la tarjeta de usuario, ese componente puede recibir datos como el nombre o la edad de la persona y usarlos por dentro para mostrar información distinta cada vez, sin tener que crear un componente diferente para cada usuario. Los props son de solo lectura, es decir, el componente que los recibe no los puede modificar directamente, solo los usa para mostrar contenido o tomar decisiones, lo cual permite que un mismo componente sea reutilizable con datos diferentes cada vez que se use.

¿Cómo y cuándo se usa useEffect en un componente de React?

useEffect es un Hook que sirve para ejecutar código en momentos específicos del ciclo de vida de un componente, es decir, cuando el componente aparece en pantalla, cuando algo cambia, o cuando el componente desaparece. La idea es simple, uno le dice que ejecute cierto código cada vez que pase algo en particular. Se usa mucho para traer datos de una API apenas se carga la pantalla, para actualizar el título de la pestaña del navegador cuando cambia un valor, o para suscribirse a algo como un temporizador y luego limpiarlo cuando el componente ya no se usa. Lo importante de useEffect es que tiene una lista de dependencias que determina cuándo se ejecuta: si esa lista se deja vacía, el código se ejecuta una sola vez apenas el componente se muestra por primera vez; si se le agregan variables, el código se vuelve a ejecutar cada vez que esas variables cambian; y si no se coloca ninguna lista, el código se ejecuta cada vez que el componente se vuelve a renderizar, lo cual casi nunca es lo que uno quiere porque puede generar muchas ejecuciones innecesarias. En resumen, useEffect es como decirle al componente que cuando pase algo específico, haga algo más.

¿Cómo se usa useState para las variables de un componente?

useState es el Hook que le permite a un componente tener memoria propia, es decir, guardar un valor que puede cambiar con el tiempo y que, cuando cambia, hace que el componente se vuelva a dibujar en pantalla automáticamente mostrando el nuevo valor. A diferencia de una variable normal de JavaScript, que si cambia React no se entera y no actualiza lo que se ve en pantalla, una variable creada con useState sí hace que la interfaz se actualice sola cada vez que cambia. Al usar useState se obtienen dos cosas, la variable con su valor actual y una función especial que se usa para cambiar ese valor; nunca se debe cambiar el valor de la variable de forma directa, siempre hay que usar esa función que React entrega. Por ejemplo, en un botón que suma una cantidad, cada vez que se hace clic se llama a esa función, React actualiza el valor internamente y automáticamente vuelve a mostrar el componente con el número actualizado, sin que uno tenga que refrescar nada manualmente
