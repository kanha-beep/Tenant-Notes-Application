import Tenant from "../../../server/Extra/NotesModels/TenantSchema.js"

const tenantData = [{
    name: "Acme",
    plan: "free",
    noteLimit: 3,
}, {
    name: "EFGH",
    plan: "free",
    noteLimit: 3,
}]
const createTenant = async () => {
    try {
        for (const tenant of tenantData) {
            const existingTenant = await Tenant.findOne({ name: tenant.name });
            if (!existingTenant) {
                const newTenant = await Tenant.create(tenant);
                console.log("Tenant created init B:", newTenant);
            } else {
                console.log("Tenant already exists:", existingTenant.name);
            }
        }
    } catch (e) {
        console.log("error init: ", e)
    }

}
createTenant();

// const testDb = [
//     {
//         username: "adminAcme",
//         email: "admin@ABCD.test",
//         password: "password",
//         roles: "admin",
//         tenant: "ABCD"
//     },
//     {
//         username: "userAcme",
//         email: "user@ABCD.test",
//         password: "password",
//         roles: "user",
//         tenant: "ABCD"
//     },
//     {
//         username: "adminGlobex",
//         email: "admin@EFGH.test",
//         password: "password",
//         roles: "admin",
//         tenant: "EFGH"
//     }, {
//         username: "userGlobex",
//         email: "user@EFGH.test",
//         password: "password",
//         roles: "user",
//         tenant: "EFGH"
//     }
// ]
const ABCD = await Tenant.findOne({ name: "ABCD" })
console.log("ABCD tenant found: ", ABCD)
const EFGH = await Tenant.findOne({ name: "EFGH" })
console.log("EFGH tenant found: ", EFGH)
const testDb = [
    {
        username: "adminABCD",
        email: "admin@ABCD.test",
        password: "password",
        roles: "admin",
        tenant: ABCD._id
    },
    {
        username: "userABCD",
        email: "user@ABCD.test",
        password: "password",
        roles: "user",
        tenant: ABCD._id
    },
    {
        username: "adminEFGH",
        email: "admin@EFGH.test",
        password: "password",
        roles: "admin",
        tenant: EFGH._id
    }, {
        username: "userEFGH",
        email: "user@EFGH.test",
        password: "password",
        roles: "user",
        tenant: EFGH._id
    }
]
for (const user of testDb) {
    const newUser = await User.create(user);
    console.log("tester created: ", newUser)
}