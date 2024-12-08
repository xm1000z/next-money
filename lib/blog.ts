import fs from 'fs-extra'; // Necesitarás instalar: npm i fs-extra @types/fs-extra
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
  const postsDirectory = path.join(process.cwd(), 'app', '[locale]', '(marketing)', 'updates', 'posts');
  
  try {
    // En producción, verificar y copiar si es necesario
    if (process.env.NODE_ENV === 'production') {
      const prodPostsDirectory = path.join(process.cwd(), '.next', 'server', 'app', '[locale]', '(marketing)', 'updates', 'posts');
      
      // Si no existe el directorio en prod, copiarlo
      if (!fs.existsSync(prodPostsDirectory) && fs.existsSync(postsDirectory)) {
        console.log('Copiando posts a directorio de producción...');
        fs.copySync(postsDirectory, prodPostsDirectory);
      }

      // Usar el directorio que exista
      const directory = fs.existsSync(prodPostsDirectory) ? prodPostsDirectory : postsDirectory;
      console.log('📂 Usando directorio:', directory);

      const mdxFiles = getMDXFiles(directory);
      console.log('📑 Archivos MDX encontrados:', mdxFiles);
      
      return mdxFiles.map((file) => {
        const { metadata, content } = readMDXFile(path.join(directory, file));
        console.log(`✅ Post procesado: ${file}`, metadata);
        return { metadata, slug: path.basename(file, '.mdx'), content };
      });
    }

    // En desarrollo usar la ruta normal
    return getMDXFiles(postsDirectory).map((file) => {
      const { metadata, content } = readMDXFile(path.join(postsDirectory, file));
      return { metadata, slug: path.basename(file, '.mdx'), content };
    });

  } catch (error) {
    console.error('❌ Error leyendo posts:', error);
    return [];
  }
}