interface ICode {
  message: CodeError;
  ok: boolean;
  code?: Code;
}

type Code = {
  id: number;
  code: string;
  active: boolean;
};

type CodeError =
  | "Nie podano kodu!"
  | "Zły kod!"
  | "Błąd serwera!"
  | "Kod został już użyty!"
  | "Kod poprawny!"
  | "Nie podano nauczyciela!"
  | "Zły kod! - inny nauczyciel";
