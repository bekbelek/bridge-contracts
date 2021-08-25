// deploy contracts for test
async function main() {
    const Bridge = await ethers.getContractFactory('CENNZnetBridge');
    console.log('Deploying CENNZnet bridge contract...');
    const bridge = await Bridge.deploy();
    await bridge.deployed();
    console.log('CENNZnet bridge deployed to:', bridge.address);

    const TestToken = await ethers.getContractFactory('TestToken');
    console.log('Deploying TestToken contract...');
    const token = await TestToken.deploy("1000000");
    await token.deployed();
    console.log('TestToken deployed to:', token.address);

    const TestToken2 = await ethers.getContractFactory('TestToken2');
    console.log('Deploying TestToken2 contract...');
    const token2 = await TestToken2.deploy("5000000");
    await token2.deployed();
    console.log('TestToken2 deployed to:', token2.address);

    // Make  deposit
    let depositAmount = 1423;
    let cennznetAddress = "0xacd6118e217e552ba801f7aa8a934ea6a300a5b394e7c3f42cd9d6dd9a457c10";
    console.log(await bridge.activateDeposits());
    console.log(await token.approve(bridge.address, depositAmount));
    console.log(await bridge.deposit(token.address, depositAmount, cennznetAddress));

    let depositAmount2 = 5644;
    // Alice
    let cennznetAddress2 = "0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d";
    console.log(await token2.approve(bridge.address, depositAmount2));
    console.log(await bridge.deposit(token2.address, depositAmount2, cennznetAddress2));

    let depositAmount3 = 11644;
    // Bob
    let cennznetAddress3 = "0x8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48";
    console.log(await token2.approve(bridge.address, depositAmount3));
    console.log(await bridge.deposit(token2.address, depositAmount3, cennznetAddress3));
    // console.log("deposit txReceipt:", txReceipt);
    // console.log("deposit tx hash:", txReceipt.hash);
    // console.log("deposit tx data:", txReceipt.data);
    // console.log("deposit tx status:", txReceipt.status);
    //console.log(txReceipt.events?.filter((x) => {return x.event == "Deposit"}));
    // console.log(await ethers.getDefaultProvider().getTransactionReceipt(txReceipt.hash));
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
