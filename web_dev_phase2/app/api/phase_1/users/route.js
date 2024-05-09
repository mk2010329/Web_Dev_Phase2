import UsersRepo from "@/app/phase_1_repo/UsersRepo";

export async function GET(request){

    const { searchParams } = new URL(request.url)
    let User = ''

    if(searchParams.get('user') && searchParams.get('pass')){
        const user = searchParams.get('user')
        const pass = searchParams.get('pass')
        User = await UsersRepo.findUser(user,pass);
    }
    else{
        User = await UsersRepo.getUsers();
    }
    return Response.json(User,{status:200});
}

export async function POST(request){
    const user = await request.json();
    const newUser = await UsersRepo.rewriteUser(user)
    return Response.json(newUser,{status:200})
}