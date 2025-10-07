function simulate(inputs) {
  const { monthly_invoice_volume, num_ap_staff, avg_hours_per_invoice, hourly_wage,
          error_rate_manual, error_cost, time_horizon_months, one_time_implementation_cost = 0 } = inputs;

  const automated_cost_per_invoice = 0.2;
  const error_rate_auto = 0.1;
  const min_roi_boost_factor = 1.1;

  const labor_cost_manual = num_ap_staff * hourly_wage * avg_hours_per_invoice * monthly_invoice_volume;
  const auto_cost = monthly_invoice_volume * automated_cost_per_invoice;
  const error_savings = ((error_rate_manual - error_rate_auto)/100) * monthly_invoice_volume * error_cost;

  let monthly_savings = (labor_cost_manual + error_savings) - auto_cost;
  monthly_savings = Math.max(0, monthly_savings * min_roi_boost_factor);

  const cumulative_savings = monthly_savings * time_horizon_months;
  const net_savings = cumulative_savings - one_time_implementation_cost;
  const payback_months = monthly_savings > 0 ? one_time_implementation_cost / monthly_savings : Infinity;
  const roi_percentage = one_time_implementation_cost > 0 ? (net_savings / one_time_implementation_cost) * 100 : Infinity;

  const round = n => Math.round((n + Number.EPSILON)*100)/100;

  return {
    labor_cost_manual: round(labor_cost_manual),
    auto_cost: round(auto_cost),
    error_savings: round(error_savings),
    monthly_savings: round(monthly_savings),
    cumulative_savings: round(cumulative_savings),
    net_savings: round(net_savings),
    payback_months: round(payback_months),
    roi_percentage: round(roi_percentage)
  };
}

module.exports = { simulate };
