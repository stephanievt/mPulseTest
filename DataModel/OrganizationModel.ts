// The problem I am solving here is matching an Org under test to the menus configured.
// In this way, we can test across different organizations and their respective menu configurations
// without using magic strings in tests and domain services. An organization
// can be defined in this shape to match what is expected in SUT.
export class Organization{
    // assigned by whatever populates this instance (e.g. Object.assign), not a constructor
    Guid!: string;
    Name!: string;
}

