import ItemsRepo from "@/app/phase_1_repo/ItemsRepo";

export async function GET(request){
        
        const Items = await ItemsRepo.getItems();
        return Response.json(Items,{status:200});
}


export async function POST(request){
        const item = await request.json();
        const newItem = await ItemsRepo.storeItem(item)
        return Response.json(newItem,{status:200})
    }