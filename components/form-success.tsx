import { BsCheckCircle } from "react-icons/bs";

interface FormSuccessProps {
    message?: string;
}

export const FormSuccess = ({
    message
}: FormSuccessProps) => {
    if(!message) return null;

    return (
        <div className="bg-emerald-500 p-3 rounded-md flex items-center gap-x-2 text-sm">
            <BsCheckCircle className="h-6 w-6" />
            <p className="pt-0.5">{message}</p>
        </div>
    )
}