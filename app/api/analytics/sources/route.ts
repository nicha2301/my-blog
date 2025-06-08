import { NextRequest, NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { GoogleAuth } from 'google-auth-library';

// 创建GoogleAuth客户端
const auth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  projectId: 'ar-app-981f1',
  credentials: {
    client_email: 'blog-905@ar-app-981f1.iam.gserviceaccount.com',
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChRrsAcqx4z8Wl\nV98XYYG6KUeloN5OrRL5o4rpRlJ+SUadXKX2xeEmKpX4D60JiwasT1oRU2AMliQg\n2lZfP01VDMzUszZshma8NPP5f8Gc1X9+TiI7QoeZ3W/bYjkdVSWa7+/vMJ90ZxO6\n0ATMZl1mdePH6SVQa5oy2bDysEXRSRJxa/nz4jRnbXRaHuqAapEm3JnATFWivC6e\nmnHHinUpbUXwAOJ4DHQjefpE9p3rxswDXGJbxQ22A1YzqgvJUo9BYpmq2v+uB5GW\nfGS4VhZLlein41LD4kESlWdxaS/MSp8vjWaVp60JkwDEgCPTFUtEeNpDpzta3W0+\nM88XbG8nAgMBAAECggEASauWpqi7cmBux42xQevvp4tNyDII+uWConh7bv4JltiA\nIkf9JBHWPGn9oZf/kjlorfN9kCaG3JkFHeC+zbmL6Mr1EkBfHwnyCg0iWZlrZun7\n2EV2y50jdjy56PwgXO7VQ8ZQ0vFiFXk0gQSe/IPSLIizqVEuE2Njx9C7TNEKw4Ok\nQqUeXjOBmw1xbNyADsiZrJg1eiD4AYaijBq6XuFI182abMVim+utl+9OxiICljf6\nLiMjsVZPmjekaJCh55cbL7/oqDltvHv1sjiPlWQuS1fhsC34baiLCu/nFrV2L2BO\nRtxNqD5+ASn9IPbyRrAHT6sO9q9a3sohpDHPkzJMsQKBgQDeHPTqgFpVVxEGNZzs\nbQ8iHo9/0l9Ygbo4Vgh8e0l83YbNZk6VTmSGN0+dkcy9tMxZoMc4x2pU8b/e3Sn7\n4KaitmlWpVe8VCOwIcvoJz5Kc9CqLzjEGiuKOc5d5HmjaJU34rg1WHpq221QI0OW\nhW6J+cUtfgh37EJeDeyeX2YoDwKBgQC54a2ILyoMWMXhdEQtB0Bfnw+6YggG3Vgo\njwn65M2fuLHNLxSATi0Tv4mBmnyElfGyCAfCfVfDdbWT6h7uvIv8oQsy7UcUVj3J\nlD3QwS/7ZGC7XMiMzUu/quipJ7fLfahXEX+8H9YGUMwPtkfWbbUjaXL6ndY7Gyu1\nk6p21uDvaQKBgQCRx6Of/hpMBNcxoiKasoHKPRCmLmdR6eNVcnIjca+r+qGtUkal\njExCIy9oFfexU2cENJhNVeUeV4U9Ox+BJ9N23A6LRf4tp3O8+JGij488woLkEBZL\n73lAQeyGh5ymec/mXDHXIXlHhTlb7alAs9b3TC30S9I3E6QDo1P4JlkgVQKBgF78\ntkLLZz9b9fLaCSTBeeHjVJQ4GEX5wl0ni0AMwA8IwMNLdbyDNoHK9SennE3cmeAS\nPnTivICDnEBz+U6iRx7X5PMnUZVQ5M4n1NbigfSDPPNB3LInDrhpS+90/nUcR3QG\n2zF1S1d63myBB4DKGzB3aGwtUBZwMgvd49RKxjNRAoGAccikzPCwbmpNS5d9EPgE\nN/GlmTW1Oah65r6wxkz9dUpo2T0+NacteZqyXV6OUJSWOeAdtS9CqhugAcQwoCpe\nEBTm59MCJbtpn9gQ/tp7Yr/wLiID76rPVjRU/CMLlCsW0VcuPFerapM2P+mHsC1x\nM2ljBytnx5rqY+TOXhtlJds=\n-----END PRIVATE KEY-----\n",
  },
});

// 指定Google Analytics 4 Property ID
// 注意：需要替换为你的实际ID
const propertyId = '483221586';

// 创建Analytics Data实例
const analyticsDataClient = new BetaAnalyticsDataClient({
  auth
});

// API để lấy các nguồn truy cập chính
async function getTrafficSources() {
  try {
    console.log('Sử dụng Property ID:', propertyId);
    
    // 获取过去30天的流量来源数据
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'sessionSource',
        },
      ],
      metrics: [
        {
          name: 'sessions',
        },
      ],
      orderBys: [
        {
          metric: {
            metricName: 'sessions',
          },
          desc: true,
        }
      ],
      limit: 5,
    });

    // 处理并转换响应数据
    const sources = response.rows?.map(row => ({
      name: row.dimensionValues?.[0].value || '(direct)',
      sessions: parseInt(row.metricValues?.[0].value || '0', 10),
    })) || [];

    return sources;
  } catch (error) {
    // Log lỗi chi tiết
    console.error('Lỗi khi truy xuất dữ liệu nguồn truy cập:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const data = await getTrafficSources();
    return NextResponse.json({ sources: data });
  } catch (error) {
    console.error('Lỗi khi truy xuất dữ liệu nguồn truy cập:', error);
    return NextResponse.json(
      { error: 'Không thể lấy dữ liệu nguồn truy cập' },
      { status: 500 }
    );
  }
} 