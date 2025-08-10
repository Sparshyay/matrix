export async function POST(request) {
  try {
    const body = await request.json();
    // In a real app: send email or store in DB.
    if (!body?.email || !body?.message) {
      return new Response(JSON.stringify({ ok: false }), { status: 400 });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}


