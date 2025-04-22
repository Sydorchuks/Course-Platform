import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const categories = [
        { name: 'Computer Science' },
        { name: 'Fitness' },
        { name: 'Accounting' },
        { name: 'Psychology' },
    ];

    for (const category of categories) {
        await prisma.category.create({
            data: category,
        });
    }

    console.log('Categories seeded!');
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
