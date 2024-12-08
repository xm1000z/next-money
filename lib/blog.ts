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
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
}

export function getBlogPosts() {
  const postsDirectory = path.join(process.cwd(), 'app', '[locale]', '(marketing)', 'updates', 'posts');
  
  // Verificar si el directorio existe
  if (!fs.existsSync(postsDirectory)) {
    console.warn('Posts directory does not exist:', postsDirectory);
    return []; // Retornar array vacío si no existe
  }

  try {
    const mdxFiles = getMDXFiles(postsDirectory);
    return mdxFiles.map((file) => {
      const { metadata, content } = readMDXFile(path.join(postsDirectory, file));
      const slug = path.basename(file, path.extname(file));
      return {
        metadata,
        slug,
        content,
      };
    });
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}