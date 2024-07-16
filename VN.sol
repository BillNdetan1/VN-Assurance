// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract VN {
    // Owner of this contract
    address private _owner;

    struct Validator {
        uint16 currencyEnrolled;
    }

    struct Currency {
        uint16 currencyNumber;
        address[] validatorAddresses;
        uint16 totalValidators;
    }
    // An array of currencies to keep track of current currencies
    Currency[] public currencies;

    // Mapping wallet address to student
    mapping(address => Validator) public validatorRegister;

    // Checks if currency already exists
    function currencyExist(uint16 _currencyNumber) public view returns (bool) {
        for (uint16 i = 0; i < currencies.length; i++) {
            if (currencies[i].currencyNumber == _currencyNumber) {
                return true;
            }
        }
        return false;
    }


    // Increments student in that course
    function validatorEnrolled(uint16 _currencyNumber) public {
        for (uint16 i = 0; i < currencies.length; i++) {
            if (
                currencies[i].currencyNumber == _currencyNumber &&
                currencies[i].totalValidators < 50
            ) {
                currencies[i].totalValidators++;
                currencies[i].validatorAddresses.push(msg.sender);
            }
        }
    }

    //Assign wallet address and create validator
    function accountAssign() public {
        validatorRegister[msg.sender] = Validator(0);
        console.log(
            "You are now in the system. Proceed to enrollment. Assigned address: ",
            msg.sender
        );
    }
    // Register for currency
    function register(uint16 _currencyEnrolled) public {
        require(
            currencyExist(_currencyEnrolled) == true,
            "This currency doesn't exist"
        );
        require(
            validatorRegister[msg.sender].currencyEnrolled == 0,
            "You can only enroll in one currency"
        );
                validatorRegister[msg.sender].currencyEnrolled = _currencyEnrolled;
                validatorEnrolled(_currencyEnrolled);
                console.log("You have been enrolled to: ", _currencyEnrolled);
    }
    

    // Show addresses enrolled for a given currency
    function getRoster(
        uint16 _currencyNumber
    ) public view returns (address[] memory addresses) {
        for (uint16 i = 0; i < currencies.length; i++) {
            if (currencies[i].currencyNumber == _currencyNumber) {
                return currencies[i].validatorAddresses;
            }
        }
        console.log("That currency doesn't exist");
    }

    constructor() {
        console.log("Welcome to Validator Node system.");
        _owner = msg.sender; // The deployer is now the contract owner
        address[] memory empty;
        currencies.push(Currency(1, empty, 0));
        currencies.push(Currency(2, empty, 0));
        currencies.push(Currency(3, empty,0));
        currencies.push(Currency(4, empty, 0));
    }
}