export default function StatsCard({ title, value }: { title: string; value: string | number }) {
    return (
        <div className="bg-muted/20 rounded-xl p-4 flex flex-col">
            <span className="text-sm opacity-80">{title}</span>
            <span className="text-2xl font-semibold mt-2">{value}</span>
        </div>
    );
}