import DefaultLayout from '@/components/Layouts/AdminLayout';
import RootAuthProvider from '@/middleware/RootAuthProvider';

export default function Home() {
    return (
        <RootAuthProvider>
            <div>User panel</div>
        </RootAuthProvider>
    );
}
