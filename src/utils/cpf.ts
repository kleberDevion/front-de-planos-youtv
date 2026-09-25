/** Tira a máscara e qualquer caractere que não seja número. */
export function sanitizeCpf(cpf: string): string {
  return cpf.replace(/\D/g, '');
}
