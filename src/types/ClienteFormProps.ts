import type { Form } from "./cliente"; 


export type ClienteFormProps = {
    form: Form;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onSuccess?: () => void;
    error?: string | null;
    agregar?: boolean;
    setAgregar: (agregar: boolean) => void;
    resetForm?: () => void;
    onCancel?: () => void;
}