export const posts = [
  {
    slug: "ejemplo-de-post",
    metadata: {
      title: "Ejemplo de Post",
      publishedAt: "2024-09-29",
      summary: "Este es un ejemplo de un post.",
      image: "https://notas.ai/ab.jpeg",
      tag: "Startups",
    },
    content: `
      <h1>Este es un Título</h1>
      <p>Este es un párrafo de texto. Puedes <strong>negrita</strong> o <em>cursiva</em>.</p>
      <h2>Sección</h2>
      <p>Aquí hay un poco de código:</p>
      <pre><code>console.log("Hola, mundo!");</code></pre>
      <p>Y aquí hay una imagen:</p>
      <img 
        src="https://notas.ai/ab.jpeg" 
        alt="Descripción de la imagen" 
        className="w-full h-auto"
      />
    `,
  },
  {
    slug: "otro-post",
    metadata: {
      title: "Otro Post",
      publishedAt: "2024-09-30",
      summary: "Este es otro ejemplo de un post.",
      image: "https://notas.ai/ab.jpeg",
      tag: "BETA",
    },
    content: `
      <h1>Otro Título</h1>
      <p>Este es el contenido de otro post.</p>
      <p>Puedes incluir <strong>texto en negrita</strong> y <em>texto en cursiva</em>.</p>
    `,
  },
]; 