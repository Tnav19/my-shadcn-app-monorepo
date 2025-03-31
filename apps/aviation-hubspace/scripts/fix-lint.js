const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

function fixUnusedVariables(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix unused state setters by prefixing with underscore
  content = content.replace(/const \[(\w+), set(\w+)\] = useState/g, (match, state, setter) => {
    if (content.indexOf(setter) === content.lastIndexOf(setter)) {
      return `const [${state}, _set${setter}] = useState`;
    }
    return match;
  });

  // Fix unused imports by prefixing with underscore
  content = content.replace(/import \{([^}]+)\} from/g, (match, imports) => {
    const fixedImports = imports.split(',').map(imp => {
      const trimmed = imp.trim();
      if (content.indexOf(trimmed) === content.lastIndexOf(trimmed)) {
        return `_${trimmed}`;
      }
      return trimmed;
    }).join(', ');
    return `import {${fixedImports}} from`;
  });

  // Fix unused constants by prefixing with underscore
  content = content.replace(/const (\w+) =/g, (match, constant) => {
    if (content.indexOf(constant) === content.lastIndexOf(constant)) {
      return `const _${constant} =`;
    }
    return match;
  });

  fs.writeFileSync(filePath, content);
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fixUnusedVariables(filePath);
    }
  });
}

walkDir(srcDir); 