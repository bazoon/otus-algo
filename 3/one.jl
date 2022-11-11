
# function powerVariant0(b, n) {
#   if (n == 0) return 1;
#   if (n % 2 === 0) {
#     const v = powerVariant0(b, Math.round(n / 2));
#     return v * v;
#   }

#   return b * powerVariant0(b, n - 1);
# }


function pow(b, n)
  if n == 0 
    return 1
  end

  if (n % 2 == 0) 
    v = pow(b, n / 2)
    return v * v
  end

  return b * pow(b, n - 1)
end



print(pow(1.000000001, 1000000000))
