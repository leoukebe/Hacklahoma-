import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // Create users
    const alice = await prisma.user.upsert({
        where: { email: 'alice@example.com' },
        update: {},
        create: {
            email: 'alice@example.com',
            name: 'Alice',
            password: 'password123',
            university: 'OU',
            bio: 'Computer Science sophomore',
            items: {
                create: [
                    {
                        title: 'Graphing Calculator',
                        description: 'TI-84 Plus CE, mint condition. Includes charger.',
                        category: 'Electronics',
                        imageUrl: 'https://m.media-amazon.com/images/I/71I3fTjqWYL._AC_SL1500_.jpg'
                    },
                    {
                        title: 'Arduino Starter Kit',
                        description: 'Unopened starter kit for Intro to Engineering',
                        category: 'Electronics',
                    }
                ],
            },
        },
    })

    const bob = await prisma.user.upsert({
        where: { email: 'bob@example.com' },
        update: {},
        create: {
            email: 'bob@example.com',
            name: 'Bob',
            password: 'password123',
            university: 'OU',
            bio: 'History major, love vintage items',
            items: {
                create: {
                    title: 'Physics Textbook',
                    description: 'Physics for Scientists and Engineers, 4th Edition',
                    category: 'Books',
                },
            },
        },
    })

    console.log({ alice, bob })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
