import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");

    const result = await fetch(
      `https://602e7c2c4410730017c50b9d.mockapi.io/users?page=${page}&limit=10`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = await result.json();

    if (data.length === 0)
      return NextResponse.json({
        status: 0,
        message: "No more Users to Fetch",
        data: [],
      });

    const isValidImageUrl = async (url) => {
      try {
        await axios.head(url);
        return true;
      } catch (error) {
        return false;
      }
    };

    // Validate avatar URLs
    let users = await Promise.all(
      data.map(async (user) => {
        const isValid = await isValidImageUrl(user.avatar);
        return {
          ...user,
          avatar: isValid
            ? user.avatar
            : "https://avatar.iran.liara.run/public/boy?username=Ash",
        };
      })
    );

    return NextResponse.json({
      status: 1,
      message: "Fetched Users Successfully!!",
      data: users,
    });
  } catch (e) {
    return NextResponse.json({
      status: 0,
      message: "Error!! Please try again later",
      error: e.message,
    });
  }
}
