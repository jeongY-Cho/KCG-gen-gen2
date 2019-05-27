import Express from "express";
import "dotenv/config"
import models, { sequelize } from "./models";


const app: Express.Application = Express()




app.get('/api', (req, res) => {
    return res.json({
        name: 'knfe',
        msg: "snee"
    });

});

app.post('/api', (req, res) => {
    return res.send('Received a POST HTTP method');
});

app.put('/api', (req, res) => {
    return res.send('Received a PUT HTTP method');
});

app.delete('/api', (req, res) => {
    return res.send('Received a DELETE HTTP method');
});


let force = true

sequelize.sync({ force: force }).then(async () => {
    if (force) {
        await createMockData()
    }

    app.listen(process.env.PORT, () => {
        console.log(`listening on port ${process.env.PORT}`);
    })
})

async function createMockData() {
    await models.User.create(
        {
            username: "Mock 1",
            fullName: "Johnny Appleseed",
            firstName: "Johnny",
            lastName: "Appleseed",
            updates: [
                {
                    oldData: { type: 1, value: 2 },
                    newData: { type: 2, value: 3 }
                }
            ]
        },
        // @ts-ignore
        {
            include: [models.Update]
        }
    )
    await models.User.create(
        {
            username: "Mock 2",
            fullName: "Johnny Appleseed",
            firstName: "Johnny",
            lastName: "Appleseed",
            updates: [
                {
                    oldData: { type: 1, value: 2 },
                    newData: { type: 2, value: 3 }
                },
                {
                    oldData: { type: 5, value: 2 },
                    newData: { type: 5, value: 3 }
                }
            ]
        },
        // @ts-ignore 
        {
            include: [models.Update]
        }
    )
}