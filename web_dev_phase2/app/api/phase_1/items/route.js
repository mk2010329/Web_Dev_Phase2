import ItemsRepo from "@/app/phase_1_repo/ItemsRepo";

export async function GET(request){
        
        const Items = await ItemsRepo.getItems();
        return Response.json(Items,{status:200});
}