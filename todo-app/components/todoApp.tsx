import { Card, CardHeader, CardTitle } from "./../components/ui/card";

export default function todoApp() {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">Todoアプリ</CardTitle>    
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
}