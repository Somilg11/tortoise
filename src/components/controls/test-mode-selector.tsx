"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";


export default function TestModeSelector() {
    return (
        <ToggleGroup type="single" defaultValue="30">
            <ToggleGroupItem value="15">15s</ToggleGroupItem>
            <ToggleGroupItem value="30">30s</ToggleGroupItem>
            <ToggleGroupItem value="60">60s</ToggleGroupItem>
            <ToggleGroupItem value="120">120s</ToggleGroupItem>
        </ToggleGroup>
    );
}