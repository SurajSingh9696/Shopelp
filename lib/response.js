import { NextResponse } from "next/server";

export function jsonOk(data, init) {
  return NextResponse.json({ success: true, data }, init);
}

export function jsonError(message, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}
