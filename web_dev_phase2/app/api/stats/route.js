import ItemsRepo from "@/app/repo/ItemsRepo";
import * as statsUsers from "@/app/repo/UsersRepo";

// export async function GET(request) {
//   try {
//     const result = await statsUsers.getBothSellersAndBuyers();
//     return Response.json(result, { status: 200 });
//   } catch (e) {
//     return Response.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }

// Done it work
// export async function GET(request) {
//   try {
//     const result = await statsUsers.getTotalUsers();
//     return Response.json(result, { status: 200 });
//   } catch (e) {
//     return Response.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }

//Done it work
// export async function GET(request) {
//   try {
//     const result = await statsItems.getTotalSalesCount();
//     return Response.json(result, { status: 200 });
//   } catch (e) {
//     return Response.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }

//Done it work
// export async function GET(request) {
//   try {
//     const result = await statsItems.getAllItems();
//     return Response.json(result, { status: 200 });
//   } catch (e) {
//     return Response.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }

//Done it work
// export async function GET(request) {
//   try {
//     const result = await statsItems.getTotalItems();
//     return Response.json(result, { status: 200 });
//   } catch (e) {
//     return Response.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }

// Done it work
// export async function GET(request) {
//   try {
//     const result = await statsItems.getAverageItemPrice();
//     return Response.json(result, { status: 200 });
//   } catch (e) {
//     return Response.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }

export async function GET(request) {
  try {
    const result = await ItemsRepo.getMostBoughtProductsLastSixMonths();
    return Response.json(result, { status: 200 });
  } catch (e) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}