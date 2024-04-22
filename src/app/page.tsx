import SignInForm from "@/components/sign-in/sign-in-form";

export default function HomePage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-20 w-full items-center justify-center rounded-lg p-3 md:h-36">
                    <h1 className="text-center font-clash-display text-4xl">CyberHQ</h1>
                </div>
                <SignInForm />
            </div>
        </main>
    );
}
