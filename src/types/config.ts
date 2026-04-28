export interface LayerConfig {
    path: string;
    template?: string;
    filename: string;
}

export interface CliConfig {
    layers: Record<string, LayerConfig>;
}