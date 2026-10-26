// Validação de upload no cliente (RF-18). O servidor deve repetir a mesma checagem: nunca confiar só no front.
export interface FileRules { accept: string[]; maxBytes: number }
export interface FileLike { name: string; size: number; type: string }

// accept aceita MIME exato ("video/mp4") ou prefixo terminado em "/" ("audio/").
export function validateFile(file: FileLike, rules: FileRules): string | null {
  if (file.size === 0) return "O arquivo está vazio. Escolha outro arquivo.";
  if (file.size > rules.maxBytes) {
    return `O arquivo tem ${(file.size / 1048576).toFixed(1)} MB e o limite é ${Math.round(rules.maxBytes / 1048576)} MB. Escolha um arquivo menor.`;
  }
  const ok = rules.accept.some((a) => (a.endsWith("/") ? file.type.startsWith(a) : file.type === a));
  return ok ? null : `Formato "${file.type || "desconhecido"}" não suportado. Use: ${rules.accept.join(", ")}.`;
}
