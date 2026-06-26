import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

// Sanity webhook → refresh every page that reads from the CMS, instantly.
// Configure a webhook in sanity.io/manage pointing at:
//   https://<your-domain>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
export async function POST(req: NextRequest) {
  const secret =
    req.nextUrl.searchParams.get("secret") ||
    req.headers.get("authorization")?.replace("Bearer ", "");
  const expected = process.env.SANITY_REVALIDATE_SECRET;

  if (!expected || secret !== expected) {
    return NextResponse.json(
      { revalidated: false, message: "Invalid or missing secret" },
      { status: 401 },
    );
  }

  revalidateTag("sanity", "max");
  return NextResponse.json({ revalidated: true });
}
