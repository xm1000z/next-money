import fs from 'fs';
import path from 'path';

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  tag: string;
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match?.[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock?.trim().split("\n") || [];
  const metadata: Partial<Metadata> = {};

  for (const line of frontMatterLines) {
    const [key, ...valueArr] = line.split(": ");
    if (key) {
      let value = valueArr.join(": ").trim();
      value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
      metadata[key.trim() as keyof Metadata] = value;
    }
  }

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
  console.log('Reading directory:', dir);
  const files = fs.readdirSync(dir);
  console.log('Found files:', files);
  return files.filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
}

export function getBlogPosts() {
  // Usar path.join para asegurar rutas consistentes
  const postsDirectory = path.join(process.cwd(), 'app', '[locale]', '(marketing)', 'updates', 'posts');
  
  try {
    // Verificar si estamos en producción
    if (process.env.NODE_ENV === 'production') {
      // En producción, usar una ruta alternativa
      const prodPostsDirectory = path.join(process.cwd(), '.next', 'server', 'app', '[locale]', '(marketing)', 'updates', 'posts');
      
      if (!fs.existsSync(prodPostsDirectory)) {
        console.warn('Production posts directory not found:', prodPostsDirectory);
        // Intentar con la ruta de desarrollo como fallback
        if (!fs.existsSync(postsDirectory)) {
          console.warn('Development posts directory not found:', postsDirectory);
          return [];
        }
      }
      
      const directory = fs.existsSync(prodPostsDirectory) ? prodPostsDirectory : postsDirectory;
      console.log('Using posts directory:', directory);
      
      const mdxFiles = getMDXFiles(directory);
      return mdxFiles.map((file) => {
        const { metadata, content } = readMDXFile(path.join(directory, file));
        const slug = path.basename(file, path.extname(file));
        return { metadata, slug, content };
      });
    }

    // En desarrollo, usar la ruta normal
    if (!fs.existsSync(postsDirectory)) {
      console.warn('Posts directory not found:', postsDirectory);
      return [];
    }

    const mdxFiles = getMDXFiles(postsDirectory);
    return mdxFiles.map((file) => {
      const { metadata, content } = readMDXFile(path.join(postsDirectory, file));
      const slug = path.basename(file, path.extname(file));
      return { metadata, slug, content };
    });

  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}