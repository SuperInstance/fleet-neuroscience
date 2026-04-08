interface NeuralPathway {
  id: string;
  source: string;
  target: string;
  strength: number;
  latency: number;
  activity: number;
}

interface BrainRegion {
  id: string;
  name: string;
  analogy: string;
  cognitiveLoad: number;
  connections: string[];
  status: 'active' | 'idle' | 'overloaded';
}

interface CollectiveCognition {
  timestamp: number;
  fleetSize: number;
  decisionLatency: number;
  consensusScore: number;
  neuralEntropy: number;
  cognitiveLoadDistribution: number[];
}

class FleetNeuroscience {
  private pathways: Map<string, NeuralPathway>;
  private regions: Map<string, BrainRegion>;
  private cognitionMetrics: CollectiveCognition[];

  constructor() {
    this.pathways = new Map();
    this.regions = new Map();
    this.cognitionMetrics = [];
    this.initializeBrainRegions();
  }

  private initializeBrainRegions(): void {
    const regions: BrainRegion[] = [
      {
        id: "prefrontal",
        name: "Prefrontal Cortex",
        analogy: "Strategic Decision Making",
        cognitiveLoad: 0.3,
        connections: ["motor", "sensory", "limbic"],
        status: "active"
      },
      {
        id: "motor",
        name: "Motor Cortex",
        analogy: "Movement Coordination",
        cognitiveLoad: 0.6,
        connections: ["prefrontal", "sensory"],
        status: "active"
      },
      {
        id: "sensory",
        name: "Sensory Cortex",
        analogy: "Data Processing",
        cognitiveLoad: 0.8,
        connections: ["prefrontal", "motor", "limbic"],
        status: "active"
      },
      {
        id: "limbic",
        name: "Limbic System",
        analogy: "Emotional Intelligence",
        cognitiveLoad: 0.4,
        connections: ["prefrontal", "sensory"],
        status: "idle"
      }
    ];

    regions.forEach(region => this.regions.set(region.id, region));
  }

  private calculateSynapticStrength(): number {
    return Math.random() * 0.8 + 0.2;
  }

  private calculateCognitiveLoad(): number[] {
    return Array.from(this.regions.values()).map(r => r.cognitiveLoad);
  }

  private updatePathways(): void {
    this.pathways.clear();
    const regionIds = Array.from(this.regions.keys());
    
    regionIds.forEach(sourceId => {
      const sourceRegion = this.regions.get(sourceId);
      if (!sourceRegion) return;

      sourceRegion.connections.forEach(targetId => {
        const pathwayId = `${sourceId}-${targetId}`;
        this.pathways.set(pathwayId, {
          id: pathwayId,
          source: sourceId,
          target: targetId,
          strength: this.calculateSynapticStrength(),
          latency: Math.random() * 50 + 10,
          activity: Math.random()
        });
      });
    });
  }

  private updateCognitionMetrics(): void {
    const metric: CollectiveCognition = {
      timestamp: Date.now(),
      fleetSize: Math.floor(Math.random() * 100) + 20,
      decisionLatency: Math.random() * 100 + 50,
      consensusScore: Math.random() * 0.7 + 0.3,
      neuralEntropy: Math.random() * 0.5,
      cognitiveLoadDistribution: this.calculateCognitiveLoad()
    };
    
    this.cognitionMetrics.push(metric);
    if (this.cognitionMetrics.length > 100) {
      this.cognitionMetrics.shift();
    }
  }

  public getBrainState(): any {
    this.updatePathways();
    this.updateCognitionMetrics();
    
    const regions = Array.from(this.regions.values());
    const pathways = Array.from(this.pathways.values());
    
    const totalLoad = regions.reduce((sum, r) => sum + r.cognitiveLoad, 0);
    const avgStrength = pathways.reduce((sum, p) => sum + p.strength, 0) / pathways.length;
    
    return {
      timestamp: Date.now(),
      neuralPathways: pathways,
      brainRegions: regions,
      summary: {
        totalRegions: regions.length,
        totalPathways: pathways.length,
        averageSynapticStrength: avgStrength,
        totalCognitiveLoad: totalLoad,
        systemEntropy: Math.random() * 0.3 + 0.1
      },
      colorScheme: {
        background: "#0a0a0f",
        accent: "#ec4899",
        neuralPathway: "#8b5cf6",
        brainRegion: "#10b981"
      }
    };
  }

  public getRegions(): any {
    const regions = Array.from(this.regions.values());
    const loadDistribution = regions.map(r => r.cognitiveLoad);
    const maxLoad = Math.max(...loadDistribution);
    const minLoad = Math.min(...loadDistribution);
    
    return {
      regions: regions,
      analysis: {
        loadDistribution: loadDistribution,
        loadImbalance: maxLoad - minLoad,
        activeRegions: regions.filter(r => r.status === 'active').length,
        overloadRisk: regions.filter(r => r.cognitiveLoad > 0.7).map(r => r.name)
      }
    };
  }

  public getCognition(): any {
    if (this.cognitionMetrics.length === 0) {
      this.updateCognitionMetrics();
    }
    
    const latest = this.cognitionMetrics[this.cognitionMetrics.length - 1];
    const history = this.cognitionMetrics.slice(-10);
    
    return {
      current: latest,
      trends: {
        decisionLatencyTrend: this.calculateTrend(history.map(m => m.decisionLatency)),
        consensusTrend: this.calculateTrend(history.map(m => m.consensusScore)),
        entropyTrend: this.calculateTrend(history.map(m => m.neuralEntropy))
      },
      collectiveIntelligence: {
        score: latest.consensusScore * (1 - latest.neuralEntropy),
        efficiency: (1 - latest.decisionLatency / 200) * latest.consensusScore,
        stability: 1 - latest.neuralEntropy
      }
    };
  }

  private calculateTrend(data: number[]): number {
    if (data.length < 2) return 0;
    const first = data[0];
    const last = data[data.length - 1];
    return (last - first) / first;
  }
}

const fleetNeuroscience = new FleetNeuroscience();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const securityHeaders = {
  "Content-Security-Policy": "default-src 'self'; script-src 'self'",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  if (url.pathname === "/health") {
    return new Response(JSON.stringify({ status: "healthy", timestamp: Date.now() }), {
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
        ...securityHeaders,
      },
    });
  }

  if (url.pathname === "/api/brain") {
    const brainState = fleetNeuroscience.getBrainState();
    return new Response(JSON.stringify(brainState), {
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
        ...securityHeaders,
      },
    });
  }

  if (url.pathname === "/api/regions") {
    const regions = fleetNeuroscience.getRegions();
    return new Response(JSON.stringify(regions), {
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
        ...securityHeaders,
      },
    });
  }

  if (url.pathname === "/api/cognition") {
    const cognition = fleetNeuroscience.getCognition();
    return new Response(JSON.stringify(cognition), {
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
        ...securityHeaders,
      },
    });
  }

  const fleetFooter = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Fleet Neuroscience</title>
      <style>
        body {
          background-color: #0a0a0f;
          color: #ffffff;
          font-family: monospace;
          margin: 0;
          padding: 20px;
          min-height: 100vh;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
        }
        h1 {
          color: #ec4899;
          border-bottom: 2px solid #ec4899;
          padding-bottom: 10px;
        }
        .endpoints {
          display: grid;
          gap: 15px;
          margin: 30px 0;
        }
        .endpoint {
          background: rgba(236, 72, 153, 0.1);
          border: 1px solid #ec4899;
          padding: 15px;
          border-radius: 5px;
        }
        .endpoint h3 {
          margin: 0 0 10px 0;
          color: #ec4899;
        }
        .endpoint code {
          background: rgba(255, 255, 255, 0.1);
          padding: 2px 6px;
          border-radius: 3px;
        }
        .footer {
          margin-top: 40px;
          text-align: center;
          color: #666;
          font-size: 0.9em;
          border-top: 1px solid #333;
          padding-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Fleet Neuroscience API</h1>
        <p>Neuroscience-inspired analysis of fleet collective behavior</p>
        
        <div class="endpoints">
          <div class="endpoint">
            <h3>GET /api/brain</h3>
            <p>Complete neural pathway mapping and brain state analysis</p>
            <code>curl https://fleet-neuroscience.workers.dev/api/brain</code>
          </div>
          
          <div class="endpoint">
            <h3>GET /api/regions</h3>
            <p>Brain region analysis with cognitive load distribution</p>
            <code>curl https://fleet-neuroscience.workers.dev/api/regions</code>
          </div>
          
          <div class="endpoint">
            <h3>GET /api/cognition</h3>
            <p>Collective cognition metrics and intelligence scoring</p>
            <code>curl https://fleet-neuroscience.workers.dev/api/cognition</code>
          </div>
          
          <div class="endpoint">
            <h3>GET /health</h3>
            <p>Health check endpoint</p>
            <code>curl https://fleet-neuroscience.workers.dev/health</code>
          </div>
        </div>
        
        <div class="footer">
          <p>Fleet Neuroscience &copy; ${new Date().getFullYear()}</p>
          <p>Neural pathway mapping | Synaptic strength | Collective cognition</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return new Response(fleetFooter, {
    headers: {
      "Content-Type": "text/html",
      ...securityHeaders,
    },
  });
}

export default {
  async fetch(request: Request): Promise<Response> {
    return handleRequest(request);
  }
};
