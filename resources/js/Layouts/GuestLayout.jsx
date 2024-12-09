import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gob-grey-5  pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-48 h-auto" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-gob-white px-6 py-4 shadow-md sm:max-w-md sm:squared">
                {children}
            </div>
        </div>
    );
}
