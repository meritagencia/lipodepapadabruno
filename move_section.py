import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the start and end of the Resultados section
resultados_start = content.find('  <!-- RESULTADOS / ANTES E DEPOIS -->')
resultados_end = content.find('  <!-- BENEFÍCIOS / PILARES DA TRANSFORMAÇÃO -->')

if resultados_start != -1 and resultados_end != -1:
    resultados_section = content[resultados_start:resultados_end]
    content = content[:resultados_start] + content[resultados_end:]
    
    # Find the end of the Sobre section
    sobre_start = content.find('  <!-- O ESPECIALISTA / DR. BRUNO NORONHA -->')
    sobre_end = content.find('  <!-- BASTIDORES / SALA DE CIRURGIA -->', sobre_start)
    
    if sobre_start != -1 and sobre_end != -1:
        # Insert resultados_section before BASTIDORES (after sobre section)
        content = content[:sobre_end] + resultados_section + content[sobre_end:]
        
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Success")
    else:
        print("Sobre section not found")
else:
    print("Resultados section not found")
