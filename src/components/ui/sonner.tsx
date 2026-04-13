import * as React from "react";
import { Toaster as SonnerToaster, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

export function Toaster(props: ToasterProps) {
    return (
        <SonnerToaster
            theme="dark"
            position="top-center"
            richColors
            closeButton
            toastOptions={{
                classNames: {
                    toast:
                        "bg-card text-card-foreground border border-border shadow-[var(--shadow-card)] rounded-2xl",
                    title: "text-foreground font-semibold",
                    description: "text-muted-foreground",
                    actionButton: "bg-primary text-primary-foreground",
                    cancelButton: "bg-muted text-muted-foreground",
                },
            }}
            {...props}
        />
    );
}

export { toast };
