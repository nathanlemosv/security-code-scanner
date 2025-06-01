import {Portal, Select, createListCollection} from "@chakra-ui/react"

interface ScanConfigSelectProps {
    onConfigSelected: (config: string) => void
    defaultValue?: string
}

const ScanConfigSelect = ({ onConfigSelected, defaultValue = "full" }: ScanConfigSelectProps) => {
    const handleValueChange = (details: { value: string[] }) => {
        const selectedValue = details.value[0]
        if (selectedValue) {
            onConfigSelected(selectedValue)
        }
    }

    return (
        <Select.Root
            defaultValue={[defaultValue]}
            collection={types}
            size="md"
            width="100px"
            onValueChange={handleValueChange}
        >
            <Select.HiddenSelect />
            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText placeholder="Select config" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
                <Select.Positioner>
                    <Select.Content>
                        {types.items.map((type) => (
                            <Select.Item item={type} key={type}>
                                {type}
                                <Select.ItemIndicator />
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    )
}

export default ScanConfigSelect;

const types = createListCollection({
    items: [
        "full",
        "xss",
        "sqli"
    ]
})