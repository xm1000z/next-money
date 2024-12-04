export const posts = [
  {
    slug: "ejemplo-de-post",
    metadata: {
      title: "Ejemplo de Post",
      publishedAt: "2024-09-29",
      summary: "Este es un ejemplo de un post.",
      image: "/images/example.jpg",
    },
    content: `
      <h1>Este es un Título</h1>
      <p>Este es un párrafo de texto. Puedes <strong>negrita</strong> o <em>cursiva</em>.</p>
      <h2>Sección</h2>
      <p>Aquí hay un poco de código:</p>
      <pre><code>console.log("Hola, mundo!");</code></pre>
      <p>Y aquí hay una imagen:</p>
      <img src="/images/example.jpg" alt="Descripción de la imagen" />
    `,
  },
  {
    slug: "otro-post",
    metadata: {
      title: "Otro Post",
      publishedAt: "2024-09-30",
      summary: "Este es otro ejemplo de un post.",
      image: "/images/another.jpg",
    },
    content: `
      <h1>Otro Título</h1>
      <p>Este es el contenido de otro post.</p>
      <p>Puedes incluir <strong>texto en negrita</strong> y <em>texto en cursiva</em>.</p>
    `,
  },
]; 