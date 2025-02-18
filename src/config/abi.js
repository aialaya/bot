export const abi = [
    {"type":"constructor","inputs":[],"stateMutability":"nonpayable"},
    {"name":"OwnershipTransferred","type":"event",
        "inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},
            {"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],
        "anonymous":false,"signature":"0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"},
    {"name":"anum",
        "type":"function",
        "inputs":[{"name":"adr","type":"address","internalType":"address"}],
        "outputs":[{"name":"","type":"uint256","internalType":"uint256"}],
        "constant":true,"signature":"0xb8456060","stateMutability":"view"},
    {"name":"init","type":"function",
        "inputs":[{"name":"addr","type":"address","internalType":"address"}],
        "outputs":[],"signature":"0x19ab453c","stateMutability":"nonpayable"},
    {"name":"listnum","type":"function",
        "inputs":[{"name":"adr","type":"address[]",
            "internalType":"address[]"}],
        "outputs":[{"name":"","type":"uint256[]",
            "internalType":"uint256[]"}],
        "constant":true,"signature":"0x2ab4ff75","stateMutability":"view"},
    {"name":"owner","type":"function",
        "inputs":[],
        "outputs":[
            {"name":"","type":"address",
                "value":"0xf02d634c845a096c7cF5f1534C7D84298CE41fDD",
                "internalType":"address"}],
        "constant":true,
        "signature":"0x8da5cb5b",
        "stateMutability":"view"},
    {"name":"renounceOwnership","type":"function",
        "inputs":[],"outputs":[],
        "signature":"0x715018a6",
        "stateMutability":"nonpayable"},
    {"name":"transferOwnership","type":"function",
        "inputs":[{"name":"newOwner","type":"address","internalType":"address"}],
        "outputs":[],"signature":"0xf2fde38b","stateMutability":"nonpayable"},
    {"name":"update","type":"function",
        "inputs":[],"outputs":[{"name":"addr","type":"address","internalType":"address"}],
        "signature":"0xa2e62045","stateMutability":"nonpayable"},
    {"name":"userList","type":"function",
        "inputs":[{"name":"","type":"address","internalType":"address"}],
        "outputs":[{"name":"","type":"uint256","internalType":"uint256"}],
        "constant":true,"signature":"0x1b4e7bd2","stateMutability":"view"}
]