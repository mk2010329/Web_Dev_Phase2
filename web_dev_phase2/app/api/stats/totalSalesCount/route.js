import * as statsItems from "@/app/repo/ItemsRepo";
import * as statsUsers from "@/app/repo/UsersRepo";

export async function GET(request) {
  try {
    const result = await statsItems.getTotalSalesCount();
    return Response.json(result, { status: 200 });
  } catch (e) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
