import db from "../../../../lib/db";
import User from "../../../../models/User";

export async function GET(req) {
  try {
    await db; // Connect to MongoDB

    // Fetch users where public = true
    const users = await User.find({ isPublic: true }).select(
      "fullName sponsorName email mobile balance"
    );

    return new Response(
      JSON.stringify({ users }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching public users:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch public users" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
