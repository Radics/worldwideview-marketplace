import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { url } = await request.json();
        
        if (!url) {
            return NextResponse.json({ error: "Missing URL" }, { status: 400 });
        }

        const normalized = url.replace(/\/+$/, "");
        const res = await fetch(`${normalized}/api/auth/setup-status`, {
            signal: AbortSignal.timeout(5000),
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: "Fetch failed", status: res.status },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: "Failed to connect" }, { status: 502 });
    }
}
