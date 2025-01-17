/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
const {PrismaClient} = require("@prisma/client");

const database = new PrismaClient();

async function main(){
    try{
        await database.category.createMany({
            data:[
                {name:"Computer Science"},
                {name: "Fitness"},
                {name: "Accounting"}
            ]
        });

        console.log("Success")
    }catch(error){
        console.log("Error seeding the database categories", error);
    }finally{
        await database.$disconnect();
    }
}

main();