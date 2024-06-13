import { cn } from "@/app/utils/cn";

export default function StatisTicItemGrid({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) {
    return (
        <div
            className="grid grid-cols-4 gap-4"
        >
            {children}
        </div>
    );
};

